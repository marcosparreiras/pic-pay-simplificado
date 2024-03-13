import { env } from "../env";
import { app } from "./app";

app.listen(env.PORT, () => {
  console.log(`Server is runnig on port ${env.PORT}`);
});
