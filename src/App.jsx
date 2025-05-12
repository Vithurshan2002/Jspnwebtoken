import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const scema = yup.object().shape({
  fname: yup.string("entersringu da").required("mukiyada"),
  lname: yup.number("enteru numberu dsa").required().max(5, "maxu"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting ,submitCount,isSubmitSuccessful},
  } = useForm({
    resolver: yupResolver(scema),
    mode: "onChange",
  });

  console.log("submitted" + isSubmitted);
  console.log("submitting" + isSubmitting);
   console.log("count" + submitCount);
      console.log("cosucesunt" + isSubmitSuccessful);

  return (
    <>
      <form
        onSubmit={handleSubmit( (data) => {
          console.log("Form data:", data);
          
        })}
      >
        Firstname:- <input {...register("fname")} type="text" />
        {errors?.fname && <p>{errors.fname.message}</p>}
        lastname:- <input {...register("lname")} type="number" />
        {errors?.lname && <p>{errors.lname.message}</p>}
        <button disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>

        {}
      </form>
    </>
  );
}

export default App;
