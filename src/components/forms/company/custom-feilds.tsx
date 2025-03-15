"use client";

import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { contact_persons } from "../form-utils";

export default function CustomFields() {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contact_persons",
  });

  const [initialized, setInitialized] = useState(false);
  let initlize = 1;
  useEffect(() => {
    if (initlize == 1) {
      if (!initialized && fields.length === 0) {
        append(contact_persons);
        setInitialized(true);
      }
      initlize++;
    }
  }, [append, fields.length, initialized]);

  const addCustomField = useCallback(
    () => append([...contact_persons]),
    [append]
  );

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className="row g-3">
          <div className="col-4">
            <label className="form-label">Contact Person Name</label>

            <input
              className="form-control"
              {...register(`contact_persons.${index}.name`)}
            />
          </div>

          <div className="col-4">
            <label className="form-label">Contact Person Number</label>

            <input
              className="form-control"
              {...register(`contact_persons.${index}.phone_number`)}
            />
          </div>

          <div className="col-4">
            <label className="form-label">Contact Person Email</label>
            <input
              className="form-control"
              {...register(`contact_persons.${index}.email`)}
            />
          </div>

          {fields.length > 1 && (
            <span
              onClick={() => remove(index)}
              className="  btn btn-sm d-flex justify-content-end "
            >
              {/* <TrashIcon className="h-4 w-4" /> */}
              Remove
            </span>
          )}
        </div>
      ))}
      <div className="d-flex justify-content-end">
        <button onClick={addCustomField} className="btn btn-sm border ">
          Add Contact Details
        </button>
      </div>
    </>
  );
}
