import { inject } from "envkist";
import { accessor } from "envkist/internal/modules/node/inject";

import { testInject } from "#/helpers/inject";

testInject({
    label: "node",
    accessor,
    inject,
});
