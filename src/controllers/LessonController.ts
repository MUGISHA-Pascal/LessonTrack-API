import { Request, Response } from "express";
import Comment from "../models/Comments";
import Lesson from "../models/Lessons";
export const lessonAdding = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { course_id, comment_text } = req.body;

    const comment = await Lesson.create({
      user_id,
      course_id,
      comment_text,
    });
    res.status(200).json({ message: "comment added successfully", comment });
  } catch (error) {
    console.log(error);
  }
};

export const getLessons = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { courseId } = req.body;
    const comments = await Comment.findAll({
      where: { user_id: userId, course_id: courseId },
    });
    res.status(200).json({ message: "comments found successfully", comments });
  } catch (error) {
    console.log(error);
  }
};

export const lessonUpdate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { comment_id, courseId, comment_text } = req.body;

    const updatedComment = await Comment.update(
      { comment_text },
      { where: { id: comment_id, course_id: courseId, user_id: userId } }
    );
    res
      .status(200)
      .json({ message: "comment updated successfully", updatedComment });
  } catch (error) {
    console.log(error);
  }
};

export const lessonDelete = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.destroy({ where: { id: commentId } });
    res
      .status(200)
      .json({ message: "comment deleted successfully", deletedComment });
  } catch (error) {
    console.log(error);
  }
};