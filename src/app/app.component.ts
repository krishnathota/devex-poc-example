import {
  NgModule,
  Component,
  Pipe,
  ViewChild,
  enableProdMode
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  DxDataGridModule,
  DxTooltipModule,
  DxTooltipComponent,
  DxTemplateModule
} from "devextreme-angular";
import DataSource from "devextreme/data/data_source";
import { Service } from "./app.service";

@Component({
  selector: "demo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Service]
})
export class AppComponent {
  dataSource: DataSource;
  collapsed = false;
  showNotSupportedTip: Boolean = false;
  @ViewChild(DxTooltipComponent, { static: false })
  notSupportedTip: DxTooltipComponent;
  contentReady = e => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(["EnviroCare"]);
    }
  };
  toggleNotSupportedTip(e) {
    if (e.target.classList.contains("withTooltip")) {
      this.notSupportedTip.target = `#${e.target.id}`;
      this.showNotSupportedTip = true;
    } else {
      this.notSupportedTip.target = undefined;
      this.showNotSupportedTip = false;
    }
  }

  constructor(service: Service) {
    this.dataSource = service.getDataSource();
  }
}

@NgModule({
  imports: [BrowserModule, DxDataGridModule, DxTemplateModule, DxTooltipModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
