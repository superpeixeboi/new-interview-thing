import React, { useState } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Dialog, ErrorDialog } from "../../../components/Dialog"
import __ from "../../../i18n"

function ContentListLayout ({ content, setContent, message, setMessage, submit }) {
  const [isScheduleShown, showSchedule] = useState(false)

  const toggleSchedule = ev => {
    showSchedule(prev => !prev)
    ev.stopPropagation()
  }

  const handleChange = ev => {
    const { name, value } = ev.target
    setContent(prev => {
      const curr = { ...prev }
      curr[name] = value
      return curr
    })
  }

  const handleFileChange = async ev => {
    const file = ev.target.files[0];
    if (!file) return setContent(prev => ({ ...prev, coverImage: undefined }))
    if (file.size > 5 * MB) return setMessage(__('Arquivo maior que 5MB'))
    const base64 = await convertBase64(file);
    setContent(prev => ({ ...prev, coverImage: base64 }))
  }

  const handleDateChange = ({ target: { type, name, value }}) => {
    if (type === 'time') setContent(prev => {
      const curr = { ...prev }
      curr[name] = dayjs(prev[name])
        .hour(value.split(':')[0])
        .minute(value.split(':')[1])
        .toISOString()
      return curr
    })
    if (type=== 'date') setContent(prev => {
      const curr = { ...prev }
      curr[name] = dayjs(prev[name])
        .year(value.split('-')[0])
        .month(parseInt(value.split('-')[1]) -1)
        .date(value.split('-')[2])
        .toISOString()
      return curr
    })
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 pb-6">
        <article className="prose">
          <h1>{__('Postar no Mural da campanha')}</h1>
        </article>
        <div>
          <Link
            to="/content"
            className="btn btn-primary float-right"
          >{__('Lista')}</Link>
        </div>
      </div>
      <form className="py-2">
        {/* content.title */}
        <div className="form-control w-full py-4">
          <label className="label">
            <span className="label-text text-lg font-bold">{__('Título da postagem *')}</span>
          </label>
          <input
            type="text"
            name="title"
            data-test-id="title"
            className="input input-bordered md:w-2/3 sm:w-full"
            value={content.title}
            onChange={handleChange}
          />
        </div>
        {/* content.coverImage */}
        <div className="form-control w-full py-4">
          <label className="label">
            <span className="label-text text-lg font-bold">{__('Imagem de capa da postagem')}</span>
          </label>
          <p className="text-sm">
            {__('Dimensão recomendada 600 x 500 px.')}
            {__('Arquivos permitidos: .jpg .png .jpeg .gif.')}
            {__('Tamanho máximo permitido de 5MB.')}
          </p>
          <div className="flex gap-2">
            <div className="s">
              <label htmlFor="coverImage" className="btn btn-outline btn-accent w-48">{__('Selecionar Imagem')}</label>
              <input
                type="file"
                name="coverImage"
                data-test-id="coverImage"
                accept="image/*"
                id="coverImage"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {content.coverImage && (
              <figure>
                <img className="max-h-12" src={content.coverImage} />
              </figure>)}
          </div>
        </div>
        {/* content.link */}
        <div className="form-control w-full py-4">
          <label className="label">
            <span className="label-text text-lg font-bold">{__('Link externo do conteúdo (se houver)')}</span>
          </label>
          <p className="text-sm">{__('Ex. Youtube, Vimeo, soundcloud, Flickr, Instagram, etc.')}</p>
          <input
            type="text"
            name="link"
            data-test-id="link"
            placeholder="http://"
            className="input input-bordered md:w-2/3 sm:w-full"
            value={content.link}
            onChange={handleChange}
          />
          <p className="text-sm">{__('Use a url inteira para o conteúdo, incluindo o http:// ou https://')}</p>
        </div>
        {/* content.body */}
        <div className="form-control w-full py-4">
          <label className="label">
            <span className="label-text text-lg font-bold">{__('Escreva a baixo a sua postagem')}</span>
          </label>
          <div className="md:w-2/3 sm:w-full">
            <ReactQuill
              className="h-48"
              data-test-id="body"
              value={content.body}
              onChange={value => handleChange({ target: {name: 'body', value}})}
            />
          </div>
        </div>
        {/* content.access */}
        <div className="form-control w-full pt-14 pb-4">
          <label className="label">
            <span className="label-text text-lg font-bold">{__('Quem pode ver?')}</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="access"
            data-test-id="access"
            value={content.access}
            onChange={handleChange}
          >
            <option></option>
            <option value="public">{__('Todo Mundo')}</option>
            <option value="subscibers">{__('Assinantes')}</option>
            <option value="private">{__('Ninguém')}</option>
          </select>
        </div>
      </form>
      {/* actions */}
      <div className="md:w-2/3 sm:w-full py-4">
        <div className="float-right">
          <Link className="link link-accent mr-4" to="/content">{__('Cancelar')}</Link>
          <div className="join">
            <div 
              data-test-id="dropdownAction"
              className={`dropdown dropdown-top ${isScheduleShown && 'dropdown-open'}`}
            >
              <label tabIndex={0} className="btn btn-primary mr-1 join-item">^</label>
              <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 my-2">
                {isScheduleShown ? (
                  <div className="flex flex-wrap gap-2 p-2">
                    <input
                      type="date"
                      name="publishedAt"
                      data-test-id="publishedAtDate"
                      placeholder="Dia de publicação"
                      className="input input-bordered w-full"
                      value={content.publishedAt && dayjs(content.publishedAt).format(DATE_FORMAT)}
                      onChange={handleDateChange}
                    />
                    <input
                      type="time"
                      name="publishedAt"
                      data-test-id="publishedAtTime"
                      placeholder="Hora de publicação"
                      className="input input-bordered w-full"
                      value={content.publishedAt && dayjs(content.publishedAt).format(TIME_FORMAT)}
                      onChange={handleDateChange}
                    />
                  </div>
                ) : (
                  <ul tabIndex={0}>
                    <li
                      data-test-id="showScheduleAction"
                      className="cursor-pointer"
                      onClick={toggleSchedule}
                    >{__('Agendar Postagem')}</li>
                  </ul>
                )}
              </div>
            </div>
            <button
              className="btn btn-primary join-item"
              onClick={() => {
                showSchedule(false)
                submit()
              }}
            >{__('Postar agora')}
            </button>
          </div>
        </div>
      </div>
      <ErrorDialog
        id="submit_error"
        title={__('Não foi possível agendar sua postagem')}
        error={message}
        onClose={() => setMessage(undefined)}
      />
      <Dialog
        id="submit_success"
        title={__('Postagem concluída com sucesso')}
      />
      
    </div>
  )
}

export default ContentListLayout

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
        resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
        reject(error);
    };
  });
};

const MB = 1000000
const DATE_FORMAT = "YYYY-MM-DD"
const TIME_FORMAT = "HH:mm"
