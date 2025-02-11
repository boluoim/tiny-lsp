/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import { runLanguageServer } from '../utils/language-server-runner.js';
import { LanguageName } from '../utils/common.js';
import { groovyConfig } from './config.js';

export const runGroovyLanguageServer = () => {
    runLanguageServer({
        serverName: 'GROOVY',
        pathName: groovyConfig.path,
        serverPort: groovyConfig.port,
        runCommand: LanguageName.java,
        runCommandArgs: [
            '-jar',
            `${groovyConfig.basePath}/lib/groovy-language-server-all.jar`
        ],
        wsServerOptions: {
            noServer: true,
            perMessageDeflate: false
        }
    });
};