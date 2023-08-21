import React, { useState, useEffect } from "react"
import api from "../../../api"
import ContentListLayout from "./ContentListLayout"

function ContentListPage () {
  const [contentList, setContentList] = useState([])

  useEffect(() => {
    api.get('/content').then(setContentList)
  }, [])

  return <ContentListLayout contentList={contentList} />
}

export default ContentListPage
