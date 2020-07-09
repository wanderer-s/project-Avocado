import React from 'react';
import PropTypes from 'prop-types';
import WordAccordion from './WordAccordion';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import '../CSS/Wordbook.css';
import { Accordion, Card, Button } from 'react-bootstrap';

class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordData: this.props.wordData,
      pageSize: 5,
      currentPage: 1,
    };
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleSentenceData,
      handleWordCardLength,
    } = this.props;
    const { length: count } = wordData;
    const { pageSize, currentPage, wordData: allData } = this.state;

    const words = paginate(allData, currentPage, pageSize);
    console.log('words------', words)
    // pagenation 이후에도 모달창을 사용할 수 있도록 index 를 조정하였음
    // const indexCoefficient = (currentPage - 1) * pageSize;
    return (
      <React.Fragment>
        <div className="wordlist_wrap">
          <div className="wordlist_stack">
            {words
              ? words.map((word, index) => {
                return (
                  <WordAccordion
                    defaultActiveKey="0"
                    key={index}
                    word={word.word}
                    sentences={word.sentences}>
                  </WordAccordion>
                );
              })
              : 'noWord!'}
          </div>
        </div>
        <Pagination
          pageSize={pageSize}
          itemsCount={count}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

WordList.propTypes = {
  addWordData: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSentenceData: PropTypes.func.isRequired,
  wordData: PropTypes.object.isRequired,
  postInputWord: PropTypes.func.isRequired,
  updateWordData: PropTypes.func.isRequired,
  deleteWordData: PropTypes.func.isRequired,
  handleWordCardLength: PropTypes.func.isRequired,
};

export default WordList;
