import { useState } from "react"
import { BottomWarning } from "../components/Bottomwarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/Inputbox"
import { SubHeading } from "../components/Subheading"
import axios from "axios";
import { useNavigate } from "react-router-dom"


export const Signup = () => {
   const [dob, setDob] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
      
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="Yourname " type="text" label={"Username"} />

        
        <InputBox onChange={e => {
          setEmail(e.target.value);
        }} placeholder="example@.com"type="text" label={"Email"} />
        <InputBox onChange={e => {
          setDob(e.target.value);
        }} placeholder="Date of Birth"type="Date" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="Your password" type="text" label={"Password"} />
        <InputBox onChange={(e) => {
          setGender(e.target.value)
        }} placeholder="Your Gender"type="text" label={"Gender"} />
        <InputBox onChange={(e) => {
          setPhonenumber(e.target.value)
        }} placeholder="Your phonenumber" type="text"label={"Phone number"} />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/signup", {
              username,
              dob,
              email,
              password,
              gender,
              phonenumber
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/"} />
      </div>
    </div>
  </div>
}