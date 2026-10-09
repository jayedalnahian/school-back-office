import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { EvaluationServices } from "./evaluation.services";

const createEvaluation = catchAsync(async (req: Request, res: Response) => {
  const result = await EvaluationServices.createEvaluation(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student evaluation created successfully",
    data: result,
  });
});

const getAllEvaluations = catchAsync(async (req: Request, res: Response) => {
  const result = await EvaluationServices.getAllEvaluations(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student evaluations retrieved successfully",
    data: result,
  });
});

const getEvaluationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EvaluationServices.getEvaluationById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student evaluation retrieved successfully",
    data: result,
  });
});

const updateEvaluation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EvaluationServices.updateEvaluation(
    id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student evaluation updated successfully",
    data: result,
  });
});

const deleteEvaluation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EvaluationServices.deleteEvaluation(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student evaluation deleted successfully",
    data: result,
  });
});

export const EvaluationControllers = {
  createEvaluation,
  getAllEvaluations,
  getEvaluationById,
  updateEvaluation,
  deleteEvaluation,
};
