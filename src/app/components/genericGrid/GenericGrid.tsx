import React from "react";

// Type for the GenericGrid component props
interface GenericGridProps<T> {
  data: T[]; // Collection of objects
}

const GenericGrid = <T extends object>({
  data,
}: GenericGridProps<T>) => {
  if (data.length === 0) return <div>No data to display.</div>;

  // Extract keys dynamically from the first object
  const keys = Object.keys(data[0]) as (keyof T)[];

  // Function to resolve Enum values
  const resolveValue = (key: keyof T, value: any): string | number => {
    return value;
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {keys.map((key) => (
            <th
              key={key as string}
              style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}
            >
              {key.toString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => 
          <tr key={rowIndex}>
            {keys.map((key) => (
              <td
                key={key as string}
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {resolveValue(key, item[key])}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default GenericGrid;
