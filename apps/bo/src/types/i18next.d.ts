import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: {
        CODE: {
          LANGUAGE_CODE: {
            de: string;
            ko: string;
            jp: string;
            en: string;
            zh: string;
          };
        };
        MESSAGE: {
          SEARCH_ACCOUNT_NOTICE: string;
          SEARCH_ACCOUNT_RESULT: string;
          INVALID_AUTH_NUMBER: string;
          INVALID_INPUT_INFORMATION: string;
          INVALID_INPUT_INFORMATION_DESCRIPTION: string;
          SEARCH_ACCOUNT_RESULT_NOT_FOUND: string;
          CAN_CHECK_ACCOUNT_AFTER_VERIFYING: string;
          CAN_UPDATE_PASSWORD_AFTER_VERIFYING: string;
          CAUTION_PASSWORD_INPUT_01: string;
          CAUTION_PASSWORD_INPUT_02: string;
          CAUTION_PASSWORD_INPUT_03: string;
          CAUTION_PASSWORD_INPUT_04: string;
          CAUTION_PASSWORD_INPUT_05: string;
          CAUTION_PASSWORD_INPUT_06: string;
          CAUTION_SIGNUP_PROGRESS: string;
          SIGNUP_PROGRESS_GUIDE: string;
          SIGNUP_PROGRESS_RESULT_01: string;
          SIGNUP_PROGRESS_RESULT_02: string;
          SIGNUP_PROGRESS_RESULT_03: string;
          LOGIN_GUIDE: string;
        };
        LABEL: {
          LOGIN: string;
          CAUTION: string;
          RESEND: string;
          CANCEL: string;
          OK: string;
          EMAIL: string;
          CHECK_AUTH_NUMBER: string;
          CHECK_AUTH_REQUEST: string;
          SEARCH_ACCOUNT: string;
          SEARCH_PASSWORD: string;
          OLD_PASSWORD: string;
          NEW_PASSWORD: string;
          NEW_PASSWORD_CHECK: string;
          GOOGLE_AUTH_GUIDE: string;
          PASSWORD_INPUT: string;
          PASSWORD_CHANGE: string;
          ACCOUNT_PASSWORD_SEARCH: string;
          ACCOUNT_SEARCH: string;
          PROGRESS_STATUS: string;
          LOGIN_WELCOME_MESSAGE: string;
          SIGNUP_PROGRESS_STATUS: string;
          SIGNUP_PROGRESS_OK: string;
          cdGroupId: string;
          cdGroupName: string;
          isUsed: string;
          cdName: string;
          cdGroupAbbreviatonEnglishName: string;
          cdGroupContent: string;
          cdSeq: string;
          cdContent: string;
          referenceVal1: string;
          referenceVal2: string;
          referenceVal3: string;
          referenceVal4: string;
          cdId: string;
          page: {
            category: {};
            menu: {};
          };
          common: {
            code: {
              common: string;
              menu: string;
              category: string;
              tenant: string;
              channel: string;
            };
          };
          link: {
            multilingual: string;
          };
          grid: {};
          tree: {
            select: string;
            add: string;
            depthAdd: string;
            expand: string;
            closed: string;
          };
          form: {
            input: {
              id: string;
              email: string;
              idEmail: string;
              password: string;
              parentKey: string;
              menuCode: string;
              menuName: string;
              menuParentName: string;
              categoryCode: string;
              categoryCodeName: string;
              categoryParentName: string;
              description: string;
            };
            checkbox: {
              idSave: string;
            };
            radio: {
              select1: string;
            };
          };
          button: {
            list: string;
            ok: string;
            cancel: string;
            save: string;
            delete: string;
            deleteAll: string;
            add: string;
            reset: string;
            modify: string;
            search: string;
            apply: string;
            approval: string;
            rejected: string;
          };
          confirm: {
            save: {
              title: string;
              message: string;
            };
            modify: {
              title: string;
              message: string;
            };
            delete: {
              title: string;
              message: string;
            };
          };
        };
      };
    };
  }
}
