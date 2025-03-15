"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import {
  createAddressbookAPI,
  updateAddressbookAPI,
} from "../../../services/addressbook-service";
import {
  addressbookSchema,
  AddressbookSchema,
} from "../../../validators/addressbook.schema";
import CustomAddress from "../company/custom-address";


interface CreateServiceProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function AddressBookForm({
  data,
  type = "Create",
}: CreateServiceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const methods = useForm<AddressbookSchema>({
    resolver: zodResolver(addressbookSchema),
    defaultValues: data,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = methods;

  // Watch the `is_active` field
  const isActive = useWatch({ control, name: "is_active" });

  console.log("data1", data);

  const onSubmit: SubmitHandler<AddressbookSchema> = async (formData) => {
    setIsLoading(true);

    try {
      const result = await (type === "Create"
        ? createAddressbookAPI(formData)
        : updateAddressbookAPI(data?.address_book_id, formData));

      toast.success(result.message || "Operation successful");
      navigate("/address-book");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel">
      <div className="panel-body">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-grow flex-col gap-6 p-6"
          >
            {/* <h6 className="mb-4">
              {type === "Create"
                ? "Create Addressbook"
                : type === "Edit"
                  ? "Edit Addressbook"
                  : "View Addressbook"}
            </h6> */}

            <div className="row g-3">
              {/* <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label"> Name</label>
                <input
                  {...register("name")}
                  disabled={type === "View"}
                  className={`form-control ${
                    type === "View" ? "opacity-50" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div> */}

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Company Name</label>
                <input
                  {...register("company_name")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.company_name && (
                  <p className="text-danger">{errors.company_name.message}</p>
                )}
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Contact Person Name</label>
                <input
                  {...register("contact_name")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.contact_name && (
                  <p className="text-danger">{errors.contact_name.message}</p>
                )}
              </div>

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Phone Number</label>
                <input
                  {...register("phone_number")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.phone_number && (
                  <p className="text-danger">{errors.phone_number.message}</p>
                )}
              </div>

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Email</label>
                <input
                  {...register("email")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Address</label>
                <input
                  {...register("address")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.address && (
                  <p className="text-danger">{errors.address.message}</p>
                )}
              </div>
              {/* <CustomerDropdown
                setStatus={(e: any) => setValue("customer_id", e.value)}
                data={data}
                type={type}
                error={errors?.customer_id?.message}
              /> */}


              <CustomAddress data={data} type={type} error={errors} />

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Pincode</label>
                <input
                  {...register("pincode")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""}`}
                />
                {errors.pincode && (
                  <p className="text-danger">{errors.pincode.message}</p>
                )}
              </div>

              {type !== "Create" && (
                <div className="col-xxl-3 col-lg-4 col-sm-6">
                  <label className="form-label">Status</label>
                  <div
                    className="d-flex align-items-center"
                    style={{ marginTop: "16px" }}
                  >
                    <div className="form-check form-switch me-2">
                      <input
                        type="checkbox"
                        {...register("is_active")}
                        disabled={type === "View"}
                        checked={isActive} // ✅ React controls the checked state
                        onChange={(e) =>
                          setValue("is_active", e.target.checked)
                        }
                        className="form-check-input"
                      />
                    </div>
                    <span className={isActive ? "text-success" : "text-danger"}>
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              )}

              <div className="d-flex gap-4 mt-4 justify-content-end">
                <div className="btn-box border p-1">
                  <Link to="/users" className="btn btn-sm ">
                    Cancel
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={type === "View" || isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
