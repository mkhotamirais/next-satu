import React from "react";
import ApplyMultiInput from "./ApplyMultiInput";
import { ApplyCodeblockCopy } from "./ApplyCodeblockCopy";
import ApplyMultiSelect from "./ApplyMultiSelect";

export default function FormInputs() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="h2">Multi Input</h2>
        <ApplyMultiInput />
      </div>
      <div>
        <h2 className="h2">Codeblock Copy</h2>
        <ApplyCodeblockCopy />
      </div>
      <div>
        <h2 className="h2">Multi Select</h2>
        <ApplyMultiSelect />
      </div>
    </div>
  );
}
