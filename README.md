# Learning way

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Git Commit Convention

- feat: 새로운 기능에 대한 커밋
- fix: 버그 수정에 대한 커밋
- build: 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋
- chore: 그 외 자잘한 수정에 대한 커밋
- ci: ci 관련 설정 수정에 대한 커밋
- docs: 문서 수정에 대한 커밋
- style: 코드 스타일 혹은 포맷 등에 관한 커밋
- refactor: 코드 리팩토링에 대한 커밋
- test: 테스트 코드 수정에 대한 커밋.
- perf: 성능 개선에 대한 커밋

```sh
feat: [HMGSLP-137] Create fe project
```

## Install package

```sh
npm install -g pnpm
```

In project

```sh
pnpm install
```

※ "self-signed certificate in certificate chain" 에러 발생 시

for windows

```sh
// node config : process.env.NODE_TLS_REJECT_UNAUTHORIZED
set NODE_TLS_REJECT_UNAUTHORIZED=0

// npm config
npm config set strict-ssl false
```

for linux or mac

```sh
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Run tasks

To run the dev server for your app, use:

```sh
npm run dev:fo
```

To create a production bundle:

```sh
npm run build:fo
```

Add shadcn-ui component to libs/component, run:

```sh
npm run shadcn-add %comp%
```

lib 추가 방법

```sh
  #npx nx g @nx/react:lib {추가할lib명} --directory=libs/{추가할lib명}
  npx nx g @nx/react:lib editor --directory=libs/editor
```

app 추가 방법

```
 #npx nx g @nx/react:lib {추가할app명} --directory=libs/{추가할app명}
 npx nx g @nx/react:app storybook --directory=apps/storybook
```

test coverage 컬럼 정의

% Stmts:

Statement Coverage (구문 커버리지): 실행된 **코드 구문(Statements)**의 비율.
예: if, const, 함수 호출 등의 모든 실행 가능한 코드 구문이 테스트되었는지를 나타냅니다.
% Branch:

Branch Coverage (분기 커버리지): 조건문이나 분기문(if, switch, ?: 등)의 모든 경우가 테스트되었는지를 나타냅니다.
예: if (condition)의 true와 false 두 가지 경우가 모두 테스트되었는지 확인.
% Funcs:

Function Coverage (함수 커버리지): 정의된 함수가 테스트된 비율.
예: 함수가 선언되었을 뿐 실행되지 않았다면 커버리지에 포함되지 않습니다.
% Lines:

Line Coverage (라인 커버리지): 실제로 실행된 **코드 줄(Line)**의 비율.
예: 블록 내 코드가 실행되지 않았으면 라인 커버리지가 부족하게 됩니다.
Uncovered Line #s:

테스트되지 않은 코드 줄 번호를 표시.
예: editor.tsx 파일에서 15-16번째 줄이 테스트되지 않은 것으로 표시됨


These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
