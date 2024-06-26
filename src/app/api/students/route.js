import { NextResponse } from "next/server";
import Register from "../../../models/registration";
import connectToDb from "../../../database";





export const dynamic = "force-dynamic";


export async function GET(req) {
  await connectToDb();

//   const page = parseInt(new URL(req.url).searchParams.get("page")) || 1; // Get page number from query parameters, default to page 1
//   const limit = 10;
//   const skip = (page - 1) * limit

  const rollNoQuery = new URL(req.url).searchParams.get("rollNo");
  const cnicQuery = new URL(req.url).searchParams.get("cnic");
  const cityQuery = new URL(req.url).searchParams.get("city");
  const genderQuery = new URL(req.url).searchParams.get("gender");
  const statusQuery = new URL(req.url).searchParams.get("status");
  const batchQuery = new URL(req.url).searchParams.get("batch");
  const courseQuery = new URL(req.url).searchParams.get("course");
  const paymentQuery = new URL(req.url).searchParams.get("payment"); // Extracting payment query parameter

  try {
      if (!rollNoQuery && !cnicQuery && !cityQuery && !genderQuery && !courseQuery && !batchQuery && !statusQuery && !paymentQuery) {
        const students = await Register.find().sort({_id:-1})
        // .skip(skip).limit(limit); // Implement pagination
          if (students.length > 0) {
              return NextResponse.json({
                  success: true,
                  data: students,
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          } else {
              return NextResponse.json({
                  success: false,
                  status: 204,
                  message: "No students found!",
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          }
      } else if (cnicQuery || rollNoQuery) {
          const filter1 = {};
          if (rollNoQuery) filter1.rollNo = rollNoQuery;
          if (cnicQuery) filter1.cnic = cnicQuery;

          const students = await Register.find(filter1).sort({_id:-1});

          if (students.length > 0) {
              return NextResponse.json({
                  success: true,
                  data: students
              }, {
                  headers: {
                      "Cache-Control": "no-cache"
                  }
              });
          } else {
              return NextResponse.json({
                  success: false,
                  status: 204,
                  message: "No students found!"
              }, {
                  headers: {
                      "Cache-Control": "no-cache"
                  }
              });
          }
      } else {
          // Building the filter object based on provided query parameters
          const filter2 = {};
          if (cityQuery) filter2.city = cityQuery;
          if (genderQuery) filter2.gender = genderQuery;
          if (statusQuery) filter2.status = statusQuery;
          if (batchQuery) filter2.batch = batchQuery;
          if (courseQuery) filter2.course = courseQuery;
          if (paymentQuery) filter2.payment = paymentQuery; // Adding payment query parameter to the filter

          // Find students based on the filter
          const students = await Register.find(filter2).sort({_id:-1});

          if (students.length > 0) {
              return NextResponse.json({
                  success: true,
                  data: students
              }, {
                  headers: {
                      "Cache-Control": "no-cache"
                  }
              });
          } else {
              return NextResponse.json({
                  success: false,
                  status: 204,
                  message: "No students found!"
              }, {
                  headers: {
                      "Cache-Control": "no-cache"
                  }
              });
          }
      }
  } catch (error) {
      console.error("An error occurred:", error);
      return NextResponse.json({
          success: false,
          status: 500,
          message: "Internal Server Error"
      }, {
          headers: {
              "Cache-Control": "no-cache"
          }
      });
  }
}