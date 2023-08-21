import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import ContentListLayout from "./ContentFormLayout"
import api from "../../../api"

function ContentListPage () {
  const [content, setContent] = useState({})
  const [message, setMessage] = useState()
  const { contentId } = useParams()

  useEffect(
    () => {
      if (!contentId) return
      api.get(`/content/${contentId}`).then(setContent).catch(setMessage)
    }, []
  )

  const submit = async () => {
    try {
      if (contentId)
        await api.put(`/content/${contentId}`, content)
      else
        await api.post('/content', content)
      
      window.submit_success.showModal()
    } catch(error) {
      setMessage(error)
      window.submit_error.showModal()
    }
  }

  return <ContentListLayout
    content={content}
    setContent={setContent}
    message={message}
    setMessage={setMessage}
    submit={submit}
  />
}

export default ContentListPage
