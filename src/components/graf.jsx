import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export function Graf({grafData}){

    if (!grafData?.prices) {
        return <div>Loading...</div>;
    }
    
    const data = grafData?.prices?.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price
    })) || [];


  return (
    <LineChart
      width={800} height={400}
      //style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
      style={{ background: '#e9e9f0', borderRadius: '8px' }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#ebe7e7" />
      {/*<XAxis dataKey="date" stroke="var(--color-text-3)" />*/}
       <XAxis dataKey="date" angle={-45} textAnchor="end" tick={{ fill: '#000000', fontSize: 11 }} />
      {/*<YAxis width="auto" stroke="var(--color-text-3)" />*/}
      <YAxis tick={{ fill: '#000000' }}  domain={['auto', 'auto']}/>
      <Tooltip
        cursor={{
          stroke: 'var(--color-border-2)',
        }}
        contentStyle={{
          backgroundColor: 'var(--color-surface-raised)',
          borderColor: 'var(--color-border-2)',
        }}
      />
      {/*<Legend />*/}   
      <Line
        type="monotone"
        dataKey="price"
        stroke="#000000"
        dot ={false}
      />
    </LineChart>
  );
}