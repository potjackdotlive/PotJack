import { useTranslation } from "react-i18next";
import { ApolloError } from "@apollo/client";
import { TFunction } from "i18next";
import { errorNotification } from "components/Notification/Notification";
import {
  TXT_BAD_REQUEST,
  TXT_ERROR_OCCURRED_WHILE_PROCESSING_YOUR_REQUEST,
  TXT_FAILED_TO_FETCH_DATA,
  TXT_INTERNAL_ERROR,
  TXT_INVALID_INPUT_TYPE,
  TXT_INVALID_REQUEST_FORMAT,
  TXT_NUMERIC_FIELD_RECEIVED,
  TXT_OPERATION_COULD_NOT_BE_RESOLVED,
  TXT_OPERATION_ERROR,
  TXT_PERSISTED_QUERIES_NOT_SUPPORTED,
  TXT_PERSISTED_QUERY_ERROR,
  TXT_PERSISTED_QUERY_NOT_FOUND,
  TXT_QUERY_PARSE_ERROR,
  TXT_QUERY_SYNTAX_INVALID,
  TXT_QUERY_VALIDATION_ERROR,
  TXT_QUERY_VALIDATION_FAILED,
  TXT_REQUEST_CONTAINS_INVALID_DATA,
  TXT_REQUEST_FAILED,
  TXT_SERVER_ERROR,
  TXT_SOMETHING_WENT_WRONG,
  TXT_UNABLE_TO_CONNECT_TO_SERVER,
  TXT_UNEXPECTED_ERROR_OCCURRED,
  TXT_UNKNOWN_ERROR,
} from "translations";

enum ApolloServerErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  GRAPHQL_PARSE_FAILED = "GRAPHQL_PARSE_FAILED",
  GRAPHQL_VALIDATION_FAILED = "GRAPHQL_VALIDATION_FAILED",
  PERSISTED_QUERY_NOT_FOUND = "PERSISTED_QUERY_NOT_FOUND",
  PERSISTED_QUERY_NOT_SUPPORTED = "PERSISTED_QUERY_NOT_SUPPORTED",
  BAD_USER_INPUT = "BAD_USER_INPUT",
  OPERATION_RESOLUTION_FAILURE = "OPERATION_RESOLUTION_FAILURE",
  BAD_REQUEST = "BAD_REQUEST",
}

type GenericError = {
  message: string;
  extensions: {
    code: ApolloServerErrorCode;
    exception: {
      stacktrace: string[];
    };
  };
};

type GenericCause = {
  name: string;
  response: unknown;
  statusCode: number;
  result: {
    errors: GenericError[];
  };
};

const getApolloErrorWithCode = (code: ApolloServerErrorCode, t: TFunction) => {
  switch (code) {
    case ApolloServerErrorCode.BAD_USER_INPUT:
      return {
        message: t(TXT_BAD_REQUEST),
        description: t(TXT_REQUEST_CONTAINS_INVALID_DATA),
      };

    case ApolloServerErrorCode.BAD_REQUEST:
      return {
        message: t(TXT_BAD_REQUEST),
        description: t(TXT_INVALID_REQUEST_FORMAT),
      };

    case ApolloServerErrorCode.GRAPHQL_PARSE_FAILED:
      return {
        message: t(TXT_QUERY_PARSE_ERROR),
        description: t(TXT_QUERY_SYNTAX_INVALID),
      };

    case ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED:
      return {
        message: t(TXT_QUERY_VALIDATION_ERROR),
        description: t(TXT_QUERY_VALIDATION_FAILED),
      };

    case ApolloServerErrorCode.OPERATION_RESOLUTION_FAILURE:
      return {
        message: t(TXT_OPERATION_ERROR),
        description: t(TXT_OPERATION_COULD_NOT_BE_RESOLVED),
      };

    case ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND:
      return {
        message: t(TXT_PERSISTED_QUERY_ERROR),
        description: t(TXT_PERSISTED_QUERY_NOT_FOUND),
      };

    case ApolloServerErrorCode.PERSISTED_QUERY_NOT_SUPPORTED:
      return {
        message: t(TXT_PERSISTED_QUERY_ERROR),
        description: t(TXT_PERSISTED_QUERIES_NOT_SUPPORTED),
      };

    case ApolloServerErrorCode.INTERNAL_SERVER_ERROR:
      return {
        message: t(TXT_INTERNAL_ERROR),
        description: t(TXT_SOMETHING_WENT_WRONG),
      };

    default:
      return {
        message: t(TXT_UNKNOWN_ERROR),
        description: t(TXT_UNEXPECTED_ERROR_OCCURRED),
      };
  }
};

const handleGraphQLError = (error: ApolloError, t: TFunction) => {
  if (error.name === "ApolloError" && error.networkError) {
    const cause = error.networkError?.cause as GenericCause;

    if (cause?.result?.errors?.length > 0) {
      const firstError = cause.result.errors[0];

      if (firstError.message.includes("Int cannot represent non-integer value")) {
        return {
          message: t(TXT_INVALID_INPUT_TYPE),
          description: t(TXT_NUMERIC_FIELD_RECEIVED),
        };
      }

      if (firstError.extensions?.code) {
        return getApolloErrorWithCode(firstError.extensions?.code, t);
      }

      return {
        message: TXT_REQUEST_FAILED,
        description: firstError.message || t(TXT_ERROR_OCCURRED_WHILE_PROCESSING_YOUR_REQUEST),
      };
    }

    return {
      message: t(TXT_SERVER_ERROR),
      description: t(TXT_UNABLE_TO_CONNECT_TO_SERVER),
    };
  }

  return {
    message: t(TXT_REQUEST_FAILED),
    description: t(TXT_FAILED_TO_FETCH_DATA),
  };
};

export const useApolloErrorHandler = (error?: ApolloError) => {
  const { t } = useTranslation();

  if (!error) {
    return;
  }

  errorNotification({
    ...handleGraphQLError(error, t),
  });
};
