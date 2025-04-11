import React, { useState, useEffect } from "react";
import "./QueryForum.css";
import { FaQuestionCircle, FaRegCommentDots } from "react-icons/fa";

const QueryForum = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerInputs, setAnswerInputs] = useState({});
  const loggedInUser = "John Doe"; // Mock logged-in user

  // Fetch all queries on load
  useEffect(() => {
    fetch("http://localhost:8080/api/queries/all")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching queries:", error));
  }, []);

  // Post a new query to backend
  const handleQuestionSubmit = () => {
    if (newQuestion.trim() === "") return;

    const newQuery = {
      question: newQuestion,
      askedBy: loggedInUser,
    };

    fetch("http://localhost:8080/api/queries/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setNewQuestion("");
      })
      .catch((error) => console.error("Error posting query:", error));
  };

  // Submit an answer to backend
  const handleAnswerSubmit = (queryId) => {
    const answer = answerInputs[queryId];
    if (!answer || answer.trim() === "") return;

    const payload = {
      queryId,
      reply: answer,
      replyBy: loggedInUser,
    };

    fetch("http://localhost:8080/api/queries/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(() => {
        // After answer is posted, refresh all queries
        return fetch("http://localhost:8080/api/queries/all");
      })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setAnswerInputs((prev) => ({ ...prev, [queryId]: "" }));
      })
      .catch((error) => console.error("Error posting answer:", error));
  };

  return (
    <div className="query-forum-container">
      <h2 className="query-title">Query Forum</h2>

      <div className="post-question">
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleQuestionSubmit}>Post</button>
      </div>

      <div className="questions-list">
        {questions.length === 0 ? (
          <p className="no-questions">No questions yet. Be the first to ask!</p>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="question-card">
              <p className="question-text">
                <FaQuestionCircle className="question-icon" />{" "}
                <strong>{q.askedBy}:</strong> {q.question}
              </p>

              <div className="answers">
                {q.answers && q.answers.length > 0 ? (
                  q.answers.map((ans, ansIndex) => (
                    <p key={ansIndex} className="answer-text">
                      <FaRegCommentDots className="answer-icon" />{" "}
                      <strong>{ans.answeredBy}:</strong> {ans.answer}
                    </p>
                  ))
                ) : (
                  <p className="no-answers">No answers yet.</p>
                )}
              </div>

              <div className="answer-input">
                <input
                  type="text"
                  value={answerInputs[q.id] || ""}
                  placeholder="Write your answer..."
                  onChange={(e) =>
                    setAnswerInputs({ ...answerInputs, [q.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAnswerSubmit(q.id);
                    }
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueryForum;
