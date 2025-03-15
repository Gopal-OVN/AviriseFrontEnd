"use client";

import { useFormContext } from "react-hook-form";
import CityFeilds from "../../utils/dropdowns/City";
import StateFeilds from "../../utils/dropdowns/State";

export default function CustomAddress({ data, type, errors }: any) {
  const { setValue, watch } = useFormContext();

  // Watch the selected country_id
  // const countryId = watch("country_id");
  const stateId = watch("state_id");

  return (
    <>
      {/* <Country
          setStatus={(e: any) => setValue("country_id", e.value)}
          data={data}
          type={type}
          error={errors?.country_id?.message} // Correctly reference errors for country_id
        /> */}

      <div className="col-3">
        <StateFeilds
          setStatus={(e: any) => setValue("state_id", e.value)}
          data={data}
          type={type}
          countryId={1} // Pass the country_id to StateFeilds
          error={errors?.state_id?.message} // Correctly reference errors for state_id
        />
      </div>

      <div className="col-3">
        <CityFeilds
          setStatus={(e: any) => setValue("city_id", e.value)}
          data={data}
          type={type}
          stateId={stateId || data?.state_id} // Pass the country_id to StateFeilds
          error={errors?.state_id?.message}
        />
      </div>
    </>
  );
}
