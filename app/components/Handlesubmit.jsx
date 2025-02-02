export default async function handleSubmit(
  questions,
  userAnswers,
  setIsSubmitting,
) {
  try {
    setIsSubmitting(true);
    const userAnswersById = {};
    questions.forEach((question, index) => {
      userAnswersById[question.id] = userAnswers[index];
    });

    console.log('Submitting data:', { user_id, userAnswersById });

    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, userAnswers: userAnswersById }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Submission failed: ${errorData}`);
    }

    const data = await response.json();

    sessionStorage.setItem('score', data.score);
    sessionStorage.setItem('results', JSON.stringify(data.results));
    sessionStorage.setItem('totalQuestions', questions.length);

    window.location.href = '/result';
  } catch (error) {
    console.error('Error submitting answers:', error);
    alert(`Error submitting answers: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
}
