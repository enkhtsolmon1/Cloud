import React, { useEffect } from "react";
import { useCtx } from "../../components/Context/MainContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Tugusugch = () => {
  const { getTugsugch, tugsugchState } = useCtx();
  useEffect(() => {
    getTugsugch();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Төгсөгчид</CardTitle>
      </CardHeader>
      <CardContent>
        {/* {tugsugchState.map((item, index) => {
          return (
            <div>
              <p>{item.firstName}</p>
            </div>
          );
        })} */}
      </CardContent>
    </Card>
  );
};

export default Tugusugch;
