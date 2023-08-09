import React from "react";
import Test from "../components/teste";

const TestePage = () => {
  // Dados de exemplo
  const data = {
    name: "Bruno",
    manager: null,
    subordinates: [
      {
        name: "Rafael",
        manager: "Bruno",
        subordinates: [
          {
            name: "Guilherme",
            manager: "Rafael",
            subordinates: [
                {   name: "George",
                    manager:"Guilherme",
                    subordinates:[]
                }
            ],
          },
          {
            name: "Thiago",
            manager: "Rafael",
            subordinates: [],
          },
        ],
      },
      {
        name: "João",
        manager: "Bruno",
        subordinates: [
          {
            name: "Richard",
            manager: "João",
            subordinates: [],
          },
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Hierarquia de Funcionários</h1>
      <Test data={data} defaultShowSubordinates={true} />
    </div>
  );
};

export default TestePage;
