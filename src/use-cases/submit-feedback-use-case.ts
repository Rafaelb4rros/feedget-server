import { MailAdapter } from "./../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repositories";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async handle(req: SubmitFeedbackUseCaseRequest) {
    const { screenshot, comment, type } = req;

    if (screenshot && !screenshot.startsWith("data:image/png;base64"))
      throw new Error("Invalid screenshot format.");

    if (!type) throw new Error("Type must be provided");
    if (!comment) throw new Error("Comment must be provided");

    await this.feedbacksRepository.create({
      screenshot,
      comment,
      type,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div>`,
        `<p>Comentário ${comment}</p>`,
        `<p>Tipo do feedback ${type}</p>`,
        `</div>`,
      ].join(""),
    });
  }
}
