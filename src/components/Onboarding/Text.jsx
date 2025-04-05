import { useNavigate } from "react-router"

function Text({path}) {
  const navigate = useNavigate()

  return (
    <div>
      <h3 className="text-xs text-center sm:text-sm mt-6 font-medium">Already have an account?
         <span className="text-purple-400 satoshi cursor-pointer" onClick={()=>navigate(path)}> Sign in here</span></h3>
    </div>
  )
}

export default Text
