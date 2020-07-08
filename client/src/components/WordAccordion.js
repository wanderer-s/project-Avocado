import React, { Component } from 'react'
import '../CSS/Wordbook.css';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { Accordion, Card, Button } from 'react-bootstrap';
// Accordion 사용하려면 부트스트랩 다운그레이드 해야 합니다. 
// npm uninstall react-bootstrap
// npm install react-bootstrap@1.0.1

class WordAccordion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: []
    }

    this.getArticles = this.getArticles.bind(this);
  }

  // 헤드라인에 word를 포함하는 기사를 배열로 리턴합니다. 
  getArticles(word) {
    const apiKey = 'd23a9f96f669464aac9d22621c8bd7d9';
    const url = `https://newsapi.org/v2/everything?q=${word}&apiKey=${apiKey}`
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log('data.articles', data.articles[0])
        this.setState({
          articles: data.articles
        })
      })
  };

  render() {
    const { word, sentences } = this.props
    return (
      < div className="accordion_area" >
        <Accordion
          defaultActiveKey="0">
          <Card className="accordion_card">
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <div className="word_btn">
                  {word}
                </div>
              </Accordion.Toggle>
              <div
                className="edit_btn">
                🥑
                </div>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="sentences-section">
                  <div>
                    <h5>Sentences</h5>
                  </div>
                  <ul className="sentences">
                    {sentences.map((sentence, index) => {
                      return <li key={index}>{sentence}</li>;
                    })}
                  </ul>
                </div>
                <div className="articles-section">
                  <div>
                    <h6>관련 기사를 읽고 단어를 익혀보세요.</h6>
                  </div>
                  <ul className="articles">
                    {/* {this.getArticles(word)} */}
                    {this.state.articles.map((article, index) => {
                      return <li>
                        <a key={index} href={article.url}>{article.title} | {article.source.name}</a>
                      </li>
                    })}
                  </ul>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

      </div >
    )
  }
}

export default WordAccordion;