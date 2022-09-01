import './style.css';
import React, { useState } from 'react'
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ListarMoedas from './listar-moedas';

const fixerUrl = 'http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3'

function Conversor() {
  const [valor, setValor] = useState('1')
  const [moedaDe, setMoedaDe] = useState('BRL')
  const [moedaPara, setMoedaPara] = useState('BRL')
  const [exibirSpinner, setExibirSpinner] = useState(false)
  const [formValidado, setFormValidado] = useState(false)
  const [exibirModal, setExibirModal] = useState(false)
  const [resultado, setResultado] = useState('')

  function handleValor({ target }) {
    setValor(target.value.replace(/\D/g, ''))
  }

  function handleMoedaDe({ target }) {
    setMoedaDe(target.value)
  }

  function handleMoedaPara({ target }) {
    setMoedaPara(target.value)
  }

  function handleFecharModal({ event }) {
    setValor('1')
    setMoedaDe('BRL')
    setMoedaPara('USD')
    setFormValidado(false)
    setExibirModal(false)
  }

  function converter(e) {
    e.preventDefault();
    setFormValidado(true)
    if (e.currentTarget.checkValidity() === true) {
      setExibirSpinner(true)
      axios.get(fixerUrl).then(res => {
        const cotacao = obterCotacao(res.data)
        setResultado(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`)
        setExibirModal(true)
        setExibirSpinner(false)
      })
    }
  }

  function obterCotacao(dados) {
    if (!dados || dados.success !== true) {
      return false;
    }
    const cotacaoDe = dados.rates[moedaDe]
    const cotacaoPara = dados.rates[moedaPara]
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
    return cotacao.toFixed(2);
  }
  return (
    <>
      <h1>Conversor de Moedas</h1>
      <div>
        <Alert variant='danger' show={false}>Erro, tente novamente!</Alert>
        <Jumbotron>
          <Form onSubmit={converter} noValidate validated={formValidado}>
            <Form.Row>

              <Col sm="3">
                <Form.Control placeholder='0' value={valor} onChange={handleValor} required />
              </Col>

              <Col sm="3">
                <Form.Control as='select' value={moedaDe} onChange={handleMoedaDe}><ListarMoedas /></Form.Control>
              </Col>

              <Col sm='1' className='text-center' style={{ paddindTop: '5px' }}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Col>

              <Col sm="3">
                <Form.Control as='select' value={moedaPara} onChange={handleMoedaPara}><ListarMoedas /></Form.Control>
              </Col>

              <Col sm='2'>
                <Button variant='success' type='submit'>
                  <span className={exibirSpinner ? null : 'hidden'}><Spinner animation='border' size='sm' /></span>
                  <span className={exibirSpinner ? 'hidden' : null}>Converter</span></Button>
              </Col>

            </Form.Row>
          </Form>

          <Modal show={exibirModal} onClick={handleFecharModal}>
            <Modal.Header closeButton>
              <Modal.Title>Conversão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {resultado}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='success' onClick={handleFecharModal}>Nova Conversão</Button>
            </Modal.Footer>
          </Modal>
        </Jumbotron>
      </div>
    </>
  );
}

export default Conversor;
