// new
{
"courseType": "ELEARNING2",
"channelUuid": "67bbca16-4180-4982-a4e0-d192212dd7c8",
"tenantIds": [1, 3],
"primaryCategoryId": 1,
"categoryIds": [1],
"targetList": [
{
"combiners": [
{
"combineType": "JOB_ROLE",
"combineValue": "3",
},
{
"combineType": "JOB_ROLE",
"combineValue": "4",
"combineName": "4",
},
{
"combineType": "JOB_ROLE",
"combineValue": "5",
}
]
}
],
"language": "ko",
"courseName": "과정명입니다.",
"courseSummary": "과정 요약명입니다.",
"courseContent": "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"교육 내용\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}",
"trainingLevelType": "BEGINNER",
"learningSpaceType": "LEARNING_WAY",
"spaceId": "",
"spaceName": "",
"coordinatorUuid": "c39280c3-3f6d-11f0-9435-0218a74d52f7",
"coordinatorName": "홍길동",
"coordinatorDeptName": "담당자 부서",
"coordinatorTelCountryCode": "KOR_82",
"coordinatorTelNo": "01000000000",
"coordinatorEmail": "hong@test.com",
"operatorUuid": "c3929798-3f6d-11f0-9435-0218a74d5224",
"operatorName": "김운영",
"operatorDeptName": "운영자 부서",
"operatorTelCountryCode": "KOR_82",
"operatorTelNo": "01000000000",
"operatorEmail": "kim@test.com"
}

// step 1
{
"wizardStep": "STEP1",
"channelUuid": "67bbca16-4180-4982-a4e0-d192212dd7c8",
"tenantIds": [1, 3],
"primaryCategoryId": 2,
"categoryIds": [10, 12],
"targetList": [
{
"groupId": 6,
"values": "34",
"combiners": [
{
"combineType": "JOB_ROLE",
"combineValue": 3
},
{
"combineType": "JOB_ROLE",
"combineValue": 4
}
]
},
{
"combiners": [
{
"combineType": "JOB_TITLE",
"combineValue": 5
}
]
}
],
"language": "ko",
"courseName": "과정명입니다.",
"courseSummary": "과정 요약명입니다.",
"courseContent": "과정 내용입니다.",
"trainingLevelType": "BEGINNER",
"learningSpaceType": "LEARNING_WAY",
"spaceId": "",
"spaceName": "",
"coordinatorUuid": "c39280c3-3f6d-11f0-9435-0218a74d52f7",
"coordinatorName": "홍길동",
"coordinatorDeptName": "담당자 부서",
"coordinatorTelCountryCode": "KOR_82",
"coordinatorTelNo": "01000000000",
"coordinatorEmail": "hong@test.com",
"operatorUuid": "c3929798-3f6d-11f0-9435-0218a74d5224",
"operatorName": "김운영",
"operatorDeptName": "운영자 부서",
"operatorTelCountryCode": "KOR_82",
"operatorTelNo": "01000000000",
"operatorEmail": "kim@test.com"
}

// step 2
{
"wizardStep": "STEP2",
"isEnrollRequired": true,
"approvalLineType": "LEADER",
"isMaxEnrollQuotaRestricted": true,
"maxEnrollQuota": 15,
"waitListPickMethodType": "NONE",
"maxWaitlistQuota": 0,
"isDuplicateEnrollAllowed": false,
"isBookDeliveryInfoRequired": false,
"isPreLevelTestRequired": false
}

// detail
{
"wizardStep": "STEP1",
"courseId": 5,
"courseType": "ELEARNING1",
"channelUuid": "67bbca16-4180-4982-a4e0-d192212dd7c2",
"tenantList": null,
"primaryCategoryId": null,
"categories": [
{
"categoryId": 11,
"name": "1-1",
"categoryCode": "category11",
"categoryContent": "",
"categoryPath": "ROOT>한글명-CATE00011>1-1",
"isPrimary": false,
"tenantIds": [
2
]
},
{
"categoryId": 22,
"name": "법정 안전교육",
"categoryCode": "1101",
"categoryContent": "법정 안전교육",
"categoryPath": "ROOT>필수교육>법정 안전교육",
"isPrimary": false,
"tenantIds": [
2
]
},
{
"categoryId": 33,
"name": "고등학교6학년",
"categoryCode": "common_category_e7a3acd2-3f75-4296-802e-4bfc7bb5ddb4",
"categoryContent": "고등학교6학년 카테고리 내용입니다.",
"categoryPath": "ROOT>고등학교>고등학교6학년",
"isPrimary": false,
"tenantIds": [
2
]
}
],
"whiteList": null,
"language": "KO",
"courseName": "과정명...",
"courseSummary": "과장 요약",
"courseContent": "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"교육 내용\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}",
"trainingLevelType": "BASIC",
"learningSpaceType": null,
"learningSpaceId": null,
"learningSpaceName": null,
"learningSpaceNameKeyIn": null,
"coordinatorUuid": "c3929798-3f6d-11f0-9435-0218a74d5224",
"coordinatorName": null,
"coordinatorDeptName": null,
"coordinatorTelCountryCode": null,
"coordinatorTelNo": "이현주/개발팀",
"coordinatorEmail": null,
"operatorUuid": "c39280c3-3f6d-11f0-9435-0218a74d52f7",
"operatorName": null,
"operatorDeptName": null,
"operatorTelCountryCode": null,
"operatorTelNo": "44445555",
"operatorEmail": null,
"isEnrollRequired": null,
"approvalLineType": null,
"isMaxEnrollQuotaRestricted": null,
"maxEnrollQuota": null,
"waitListPickMethodType": null,
"maxWaitlistQuota": null,
"isDuplicateEnrollAllowed": null,
"primaryCurriculumId": null,
"isLearnEnvEnabled": null,
"deviceRestrictType": null,
"isIntranetRestricted": null,
"learningRestrictTimeType": null,
"isReviewRestricted": null,
"maxReviewPeriodMonths": null,
"isCaptureBlockEnabled": null,
"isSecurityAgreementEnable": null,
"isLearnControlEnabled": null,
"isDailyLearningProgressRestricted": null,
"maxDailyLearningProgress": null,
"isProgressResetEnabled": null,
"isSequentialLearningRequired": null,
"isPlayerControlRestricted": null,
"maxPlayBackRate": null,
"isUsePassOption": null,
"passMethodType": null,
"isCertificateProvided": null,
"progressMinPassScore": null,
"attendanceMinPassScore": null,
"examMinPassScore": null,
"asgmtMinPassScore": null,
"totalMinPassScore": null,
"progressWeights": null,
"attendanceWeights": null,
"examWeights": null,
"asgmtWeights": null,
"recognizedStudyMinType": null,
"recognizedStudyCycles": null,
"recognizedStudyMinutes": null,
"isRecognizedStudyPoint": null,
"recognizedStudyPoint": null,
"isCommunicationToolEnabled": null,
"isNoticeEnabled": null,
"isQnaBoardEnabled": null,
"isMartialBoardEnabled": null,
"isCommunityEnabled": null,
"isSharingAllowed": null,
"isInstructorAssigned": null,
"instructorAssignType": null,
"instructorId": null,
"instructorName": null,
"isTextbookProvided": null,
"textbookName": null,
"textbookFee": null,
"isRelatedPrerequisiteCourseExisted": null,
"preRequisiteCourseList": null,
"relatedCourseList": null,
"hmgStandardMainCategory": null,
"hmgStandardSubCategory": null,
"isUseTrainingCostPerPerson": null,
"trainingCostPerPerson": null,
"isUseEmploymentInsuranceRefund": null,
"employmentInsuranceRefund": null,
"isUseOutsourcing": null,
"isPreLevelTestRequired": null,
"isBookDeliveryInfoRequired": null,
"tutorId": null,
"tutorName": null,
"outsourcingCompanyId": null,
"outsourcingCompanyName": null,
"isUsed": null,
"courseValidityStartDate": null,
"courseValidityStartHour": null,
"courseValidityEndDate": null,
"courseValidityEndHour": null,
"thumbnailFileGroupUuid": null,
"primaryThumbnailFileUuid": null,
"tagNames": null
}

//
//
//
/{
"enrollOption": "IMPOSSIBLE",
"learningEnvOption": "OPTIONAL",
"learningControlOption": "OPTIONAL",
"passOption": "MANDATORY",
"communicationOption": "OPTIONAL",
"instructorOption": "OPTIONAL",
"textBookOption": "OPTIONAL",
"relatedCourseOption": "OPTIONAL",
"adminDataOption": "OPTIONAL",
"allowedContentTypes": [
"VIDEO",
"EXAM",
"ASSIGNMENT"
],
"fileStorageType": "AWS_INTERNAL"
}
