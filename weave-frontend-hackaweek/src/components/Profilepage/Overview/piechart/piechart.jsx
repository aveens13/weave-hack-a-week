import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'java',
    label: 'java',
    value: 355,
    color: 'yellow',
  },
  {
    id: 'CSS',
    label: 'CSS',
    value: 547,
    color: 'hsl(263, 100%, 50%)',
  },
  {
    id: 'javascript',
    label: 'javascript',
    value: 393,
    color: 'hsl(63, 70%, 50%)',
  },
  {
    id: 'HTML',
    label: 'HTML',
    value: 321,
    color: 'hsl(340, 70%, 50%)',
  },
];

const Piechart = () => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
      sortByValue={true}
      innerRadius={0.8}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={12}
      arcLinkLabelsTextColor='#333333'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', '1.5']],
      }}
      isInteractive={false}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 20,
        },
      ]}
      animate={false}
      legends={[
        {
          anchor: 'left',
          direction: 'column',
          justify: false,
          translateX: 60,
          translateY: 10,
          itemsSpacing: 24,
          itemWidth: 100,
          itemHeight: 10,
          itemTextColor: '#000',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 14,
          symbolShape: 'circle',
        },
      ]}
    />
  );
};

export default Piechart;
