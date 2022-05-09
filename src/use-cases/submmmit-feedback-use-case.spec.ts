import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";
describe("Submit feedback", () => {
  const createFeedbackSpy = jest.fn();
  const sendMailSpy = jest.fn();

  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.handle({
        type: "OUTRO",
        comment: "something",
        screenshot: "data:image/png;base64potao",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.handle({
        type: "",
        comment: "something",
        screenshot: "data:image/png;base64potao",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.handle({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64potao",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with invalid screenshot type", async () => {
    await expect(
      submitFeedback.handle({
        type: "BUG",
        comment: "BUG",
        screenshot: "image.jpg",
      })
    ).rejects.toThrow();
  });
});
