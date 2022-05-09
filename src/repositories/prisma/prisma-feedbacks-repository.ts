import { prisma } from "../../lib";
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from "../feedbacks-repositories";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
    await prisma.feedback.create({
      data,
    });
  }
}
