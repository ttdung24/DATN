const CustomAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill='#666'
        transform='translate(40, 0)'
      >
        {payload.value}
      </text>
    </g>
  );
};

export default CustomAxisTick;
