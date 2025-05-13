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
    reset,getValues,setValue,trigger,
    formState: { errors, isSubmitted, isSubmitting ,submitCount,isSubmitSuccessful,dirtyFields,touchedFields,isReady,isLoading},
  } = useForm({
    resolver: yupResolver(scema),
    mode: "onChange",
  });

  console.log("submitted" + isSubmitted);
  console.log("submitting" + isSubmitting);
   console.log("count" + submitCount);
      console.log("cosucesunt" + isSubmitSuccessful);
      console.log("dirtyfild" + dirtyFields.fname);
      console.log("touch" + touchedFields.lname);
      console.log("dirtyfild" + dirtyFields);
      console.log("read" + isReady);
      console.log("load" + isLoading);
   

const resetu=()=>{
console.log("datataadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
console.log(getValues())
}
      
      

  return (
    <>
      <form
        onSubmit={handleSubmit( (data) => {
          console.log("Form data:", data);
          reset();
          
        })}
      >
        Firstname:- <input {...register("fname")} type="text" />
        {errors?.fname && <p>{errors.fname.message}</p>}
        lastname:- <input {...register("lname")} type="number" />
        {errors?.lname && <p>{errors.lname.message}</p>}
        <button disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        <input type="submit"disabled={submitCount>3} />
       
       Dirty Fields: {JSON.stringify(dirtyFields)}
          <button type="submit" disabled={!dirtyFields.fname}>Submit</button>
        <button onClick={()=>{trigger('fname')}}>reset</button>
         
          
      </form>
    </>
  );
}

export default App;
