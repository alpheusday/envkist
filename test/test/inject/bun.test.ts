import { inject } from "envkist/internal/bun";
import { accessor } from "envkist/internal/modules/bun/inject";

import { testInject } from "#/helpers/inject";

testInject({
    label: "bun",
    accessor,
    inject,
});
