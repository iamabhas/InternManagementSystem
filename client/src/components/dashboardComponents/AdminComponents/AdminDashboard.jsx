import React from "react";
import { data01, data02 } from "../../../data/testData";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { generateColors } from "../../utils/GenerateColors";
import { Typography, Box, Divider } from "@mui/material";
const Admin = () => {
  const colors = generateColors(data01);
  return (
    <main>
      <Typography variant="h5">Ongoing Batches</Typography>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box>
          <PieChart width={400} height={240}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>

            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              iconSize={10}
            />
            <Tooltip />
          </PieChart>
          <Typography variant="h7">Node JS 2024</Typography>
        </Box>
        <Box>
          <PieChart width={400} height={240}>
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>

            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              iconSize={10}
            />
            <Tooltip />
          </PieChart>
          <Typography variant="h7">QA 2024</Typography>
        </Box>
      </Box>
      <Divider sx={{ m: 3 }} />
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box>
          <Typography variant="h5">Incoming Applications</Typography>
        </Box>
        <Box>
          <Typography variant="h5">Current Interns on leave</Typography>
        </Box>
      </Box>
    </main>
  );
};

export default Admin;
