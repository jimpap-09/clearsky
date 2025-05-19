import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TotalGradeHistogram({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="grade" label={{ value: 'Grade', position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}