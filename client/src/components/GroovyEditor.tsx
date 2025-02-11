import { useEffect, useState } from 'react'
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import '@codingame/monaco-vscode-groovy-default-extension';
import { LogLevel } from '@codingame/monaco-vscode-api';
import { MonacoEditorLanguageClientWrapper, type WrapperConfig } from 'monaco-editor-wrapper';
import { configureMonacoWorkers } from '../utils/index.js';

const code = `package test.org;
import java.io.File;
File file = new File("E:/Example.txt");
`;

const groovyConfig = {
  port: 30002,
  path: '/groovy',
  basePath: '/home/gradle/mlc/languages/groovy'
};

const wrapperConfig: WrapperConfig = {
  $type: 'extended',
  htmlContainer: document.getElementById('container')!,
  logLevel: LogLevel.Debug,
  vscodeApiConfig: {
      serviceOverrides: {
          ...getKeybindingsServiceOverride(),
      },
      userConfiguration: {
          json: JSON.stringify({
              'workbench.colorTheme': 'Default Dark Modern',
              'editor.guides.bracketPairsHorizontal': 'active',
              'editor.wordBasedSuggestions': 'off',
              'editor.experimental.asyncTokenization': true
          })
      }
  },
  editorAppConfig: {
      codeResources: {
          modified: {
              text: code,
              fileExt: 'groovy'
          }
      },
      monacoWorkerFactory: configureMonacoWorkers
  },
  languageClientConfigs: {
      groovy: {
          clientOptions: {
              documentSelector: ['groovy']
          },
          connection: {
              options: {
                  $type: 'WebSocketUrl',
                  url: `ws://localhost:${groovyConfig.port}${groovyConfig.path}`
              }
          }
      }
  }
};

export function GroovyEditor() {
  const [wrapper, setWrapper] = useState<MonacoEditorLanguageClientWrapper | null>(null);

  useEffect(() => {
    if (wrapper) return;
    const wrapperInstance = new MonacoEditorLanguageClientWrapper();
    setWrapper(wrapperInstance);
  }, [wrapper]);

  const handleStart = () => {
    if (!wrapper) return;
    wrapper.initAndStart(wrapperConfig);
  }

  const handleDispose = () => {
    if (!wrapper) return;
    wrapper.dispose();
  }

  return (
    <>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleDispose}>Dispose</button>
      <div style={{
        width: 800,
        height: 600,
        border: '1px solid #ccc'
      }} id="container"></div>
    </>
  )
}
