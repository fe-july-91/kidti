import { useState } from "react"
import GenerativeBG from "../../Components/GenerativeBg/GenerativeBG"
import { LogInForm } from "../../Components/LogInForm/LogInForm"
import './LogInPage.scss'

export const LogInPage: React.FC = () => {
  return (
    <div>
      <GenerativeBG />
      <div className="logInPage">
        <LogInForm />
      </div>
    </div>
  )
}