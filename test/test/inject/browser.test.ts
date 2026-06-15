import { inject } from "envkist/internal/browser";
import { accessor } from "envkist/internal/modules/browser/inject";

import { testInject } from "#/helpers/inject";

testInject({
    label: "browser",
    accessor,
    inject,
});
