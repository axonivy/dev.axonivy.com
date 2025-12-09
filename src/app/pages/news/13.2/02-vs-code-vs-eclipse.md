## Visual Studio Code Extension vs. Eclipse-based PRO Designer {#vscode}

The Visual Studio Code Extension is now the primary PRO Designer for experienced developers. Although still in beta, it already offers a modern, fast, and extensible environment that continues to receive active feature development. In contrast, the Eclipse-based PRO Designer has entered maintenance mode: no new features are delivered in 13.2, and only essential bug fixes remain.

New Features in the Visual Studio Code Extension:

- **Project Conversion**: Easily migrate existing projects into the VS Code–based PRO Designer.

- **IAR Support**: Full handling of Ivy Archive (*.iar) files, including import and dependency management.

- **Integrated Test Execution**: Run `@IvyTest`, `@IvyProcessTest`, and `@IvyWebTest` directly in VS Code with noticeably faster execution and tighter workflow integration.

- **Engine Download & Maven Build Simplification**: The extension can now download and manage the Axon Ivy Engine automatically, while Maven builds use the standard `maven-compiler-plugin` by default for a lighter and more CI-friendly build process.

- **Improved Editors**: All new features introduced in the Editors of the other <a href="#designers">Designers</a> are also available in the VS Code Extension.

<div class="short-links">
    <a href="https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer-13"
        target="_blank" rel="noopener noreferrer">
        <i class="si si-book"></i> Axon Ivy PRO Designer 13 Extension for Visual Studio Code
    </a>
</div>

<div class="short-links">
    <a href="../../deprecation/eclipse"
        target="_blank" rel="noopener noreferrer">
        <i class="si si-book"></i> Deprecation of the Eclipse-based PRO Designer
    </a>
</div>

<div class="short-links">
    <a href="https://axonivy.github.io/project-build-plugin/release/13.2/index.html"
        target="_blank" rel="noopener noreferrer">
        <i class="si si-book"></i> Axon Ivy Maven Project Build Plugin
    </a>
</div>