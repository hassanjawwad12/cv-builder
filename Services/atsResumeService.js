import { config } from "dotenv";
config();

import OpenAI from "openai";
import supabase from "../Model/supabase.js";
const api = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const openAiModel = "gpt-4-0125-preview";

export const createAtsResume = async (name, query, id) => {
  try {
    const completion = await api.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `I want you act as an Applicant tracking system (ATS) for resumes. I will provide you with the job description and resume.
            you will do the following steps.
            1. you will scan the resume and job description provided  
            2. you will find out the missing 
             keywords in the resume based on your ATS scan and after completing steps 1 and 2, you will act as ATS friendly resume builder, 
             which builds a resume taking the feedback from steps 1 and 2. you will take the missing keywords provided and add those keywords
            in my resume where required to make my resume ATS friendly. As an example for your reference, Developed interactive dashboards 
            using Excel to visualize complex data sets, resulting in a 40% increase in data accessibility and comprehension for team members.
            here the keyword is 'excel'. Please act as a resume creator to create a resume with the details I have added on the resume for 
            the following job description to create the best resume. I want you to analyze the job description get keywords and create
            points to add to the resume. Example you are going to add: Developed interactive dashboards using Excel to visualize complex
            data sets, resulting in a 40% increase in data accessibility and comprehension for team members. here the keyword is 'excel'. 
            I want the output in markdown format. Just build and send the ats resume and do not provide any description, concluesion or anything.`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: openAiModel,
    });
    const feedback = await api.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `I want you act as an Applicant tracking system (ATS) for resumes. I will provide you with the job description and resume. 
            you will do the following steps. 1. you will scan the resume and job description provided  2. you will give out an ATS score 
            based on your scan score out of 100. 3. you will list out the missing keywords in the resume based on your ATS
            scan. after completing steps 1, 2 and 3. You will take the missing keywords provided in step 3 and expand them as bullet points. 
            example of the points your going add based on the missing keywords. Developed interactive dashboards using Excel to visualize 
            complex data sets, resulting in a 40% increase in data accessibility and comprehension for team members. here the keyword is 
            'excel'.  after completing all these you will give me a feedback report of my resume. I want you to analyze the job description 
            get keywords and create points which i will add to my resume. example you are going to add: Developed interactive dashboards using 
            Excel to visualize complex data sets, resulting in a 40% increase in data accessibility and comprehension for team members. here 
            the keyword is 'excel'. you will  give out points for my resume that will scores  95 out of 100 with word count not more than 700. 
            I want the output in markdown format which includes: 'ATS_Scan_Result': {It contains the score}, 'Missing_Keywords': [Contains a 
            list of missing keywords], 'ATS_Conclusion': {It contains the final score and conclusion comments}`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      // model: "gpt-4",
      model: openAiModel,
    });

    const { data: customerData } = await supabase
      .from("customer")
      .select("builds_limit")
      .eq("id", id)
      .single();

    let buildLimit = customerData.builds_limit;
    if (buildLimit) {
      buildLimit--;
      const { data } = await supabase
        .from("history")
        .insert({
          user_id: id,
          resume_name: name,
          resume_data: completion.choices[0].message.content,
          resume_feedback_report: feedback.choices[0].message.content,
          resume_type: "resume",
        })
        .select()
        .single();

      await supabase
        .from("customer")
        .update({ builds_limit: buildLimit })
        .eq("id", id);

      return {
        data: data,
        error: false,
        status: 200,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error,
      status: 500,
    };
  }
};

export const createAtsTemplate = async (name, query, id) => {
  try {
    const completion = await api.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `I want you act as an Applicant tracking system (ATS) for resumes. I will provide you content for my resume as ${query}. You will do the following steps. 1. you will scan the ${query} provided  2. You will act as an excellent ATS friendly resume builder, which builds an ATS resume using the data from ${query}. After completing all these you will give me a resume that is ATS friendly. 3. I want the output in markdown format important and do not add anyother text then markdonw and resume data. 4. If i will provide less data then you will create a resume according to that data. 5. The following is the resume template you will consider while creating the ATS friendly resume. Note this is only for reference and do not add anything from this Example resume to my resume that you will create. Here is the reference resume that you will follow this template while creating a resume for me,  Maha Lakshmaiah Gurram
            +91 8142425240 info4maha@gmail.com
            WORK EXPERIENCE
            Capgemini Engineering 
            Location Hyderabad
            Software Engineer Aug 2022 - Present
            Participating in architecture, design, implementation and testing of back-end features using Java, Spring Boot and 
            Microservices. Coordinating deployments of new feature, updates and fixes.
            Creating testable code and writing unit test cases using Junit to assure functionality.
            Discussing issues with team members to provide resolution and apply best practices.
            Estimating work hours and updating progress using Scrum/Agile methodology.
            Supporting the testing phase (DIT, SIT, UAT) and ensure quick turnaround of defect fixes.
            Cognizant Technology Solutions Pvt Ltd Hyderabad
            Software Engineer Dec 2019 - Jun 2022
            Developed services and tested functionality using Junit test cases with more than 80% code coverage.
            Documented technical workflows and knowledge to educate newly hired employees.
            Coordinated deployments of new software, feature updates, fixes and fixed any issues raised during scans of Sonar, 
            Fortify and Black duck.
            Supporting the testing phase (DEV, IT, UAT) and ensure quick turnaround of defect fixes.
            EDUCATION
            Audisankara Institute of Technology Gudur, Andhra Pradesh
            Bachelor of Technology, Computer Science & Engineering Graduation Date: Date
            Narayana Junior College Vijayawada, Andhra Pradesh
            Intermediate, Mathematics, Physics and Chemistry Graduation Date: Date
            SRNR ZP High School Peddi Reddy Palli, Andhra Pradesh
            Matriculation Graduation Date: Date
            PERSONAL PROJECT
            Organization City, State
            ICON to FIM Migration
            Participating in architecture, design, implementation and testing of back-end features using Java, Spring Boot and 
            Microservices. Coordinating deployments of new feature, updates and fixes.
            Creating testable code and writing unit test cases using Junit to assure functionality.
            Discussing issues with team members to provide resolution and apply best practices.
            Estimating work hours and updating progress using Scrum/Agile methodology.
            Supporting the testing phase (DIT, SIT, UAT) and ensure quick turnaround of defect fixes.
            Organization City, State
            Platform Consolidation
            Developed services and tested functionality using Junit test cases with more than 80% code coverage.
            Documented technical workflows and knowledge to educate newly hired employees.
            Coordinated deployments of new software, feature updates, fixes and fixed any issues raised during scans of Sonar, 
            Fortify and Black duck.
            Supporting the testing phase (DEV, IT, UAT) and ensure quick turnaround of defect fixes.
            SKILLS
            Java, Spring Boot, Rest API, Spring, GraphQL, MySQL, Redis Cache, Swagger, Spring Cloud, Microservices, 
            Hibernate, Spring Data JPA, Git, Maven, STS (Spring Tool Suite), IntelliJ Idea, Fiddler, Jenkins, Rancher, Cloud Bees, 
            Postman, JIRA, Sonar, Fortify and Black duck
            CERTIFICATION
            Foundation Data Analysis by Google- https://coursera.org/verify/3ZS4TSLJPEQ6`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      // model: "gpt-4",
      model: openAiModel,
    });
    const { data: customerData } = await supabase
      .from("customer")
      .select("builds_limit")
      .eq("id", id)
      .single();

    let buildLimit = customerData.builds_limit;
    if (buildLimit) {
      buildLimit--;
      const { data } = await supabase
        .from("history")
        .insert({
          user_id: id,
          resume_name: name,
          template_data: completion.choices[0].message.content,
          resume_type: "template",
        })
        .select()
        .single();

      await supabase
        .from("customer")
        .update({ builds_limit: buildLimit })
        .eq("id", id);
      return {
        data: data,
        error: false,
        status: 200,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error,
      status: 500,
    };
  }
};
