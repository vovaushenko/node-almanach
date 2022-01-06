const fs = require('fs');

const range = (start, stop, step = 1) =>
	Array(Math.floor((stop - start) / step))
		.fill(start)
		.map((x, y) => x + y * step);

const generateStyles = ({ className, selector, start, step, end, unit }) =>
	range(start, end, step).map(
		(val, id) => `${className}-${id}: {${selector}: ${val}${unit};}`
	);

const generateStyleSheet = ({
	className,
	selector,
	start,
	step,
	end,
	unit,
	stylesheetName,
}) => {
	const classList = generateStyles({
		className,
		selector,
		start,
		step,
		end,
		unit,
	}).join('\n');

	fs.writeFile(`${stylesheetName}.css`, classList, (err) => {
		if (err) throw err;
		console.log(
			`Stylesheet ${stylesheetName} has been created. Size ${stylesheetName.length}`
		);
	});
};

generateStyleSheet({
	className: 'py',
	selector: 'padding',
	start: 0.25,
	end: 2,
	step: 0.25,
	unit: 'rem',
	stylesheetName: 'spacing',
});
