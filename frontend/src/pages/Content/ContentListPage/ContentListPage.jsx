import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../../api"
import __ from "../../../i18n"

function ContentListPage () {
  const [contentList, setContentList] = useState([])
  const [message, setMessage] = useState()

  useEffect(
    () => {
      api.get('/content').then(setContentList).catch(setMessage)
    }, []
  )

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 pb-16">
        <article className="prose">
          <h1>{__('Mural da campanha')}</h1>
        </article>
        <div>
          <Link
            to="/content/new"
            className="btn btn-primary float-right"
          >{__('Criar')}</Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {contentList.map(content => (
          <div className="card card-compact w-96 bg-base-100 shadow-xl" key={content._id}>
            <figure><img src={content.coverImage || PIC} alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">{content.title}</h2>
              <div className="card-actions justify-end">
                <Link
                  to={`/content/edit/${content._id}`}
                  className="btn btn-secundary"
                >{__('Editar')}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentListPage

const PIC = "https://marketsplash.com/content/images/2022/04/5-Great-Blog-Post-Templates-2.png"
