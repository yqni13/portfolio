import { Component, signal } from "@angular/core";
import { form, required } from "@angular/forms/signals";
import { TestInputComponent } from "../../common/form/test-input/test-input.component";
import * as CustomValidator from "../../../utils/helper/custom-validators";

interface TestData {
    demoInput: string,
    testInput: number
}

@Component({
    selector: 'app-test',
    imports: [
        TestInputComponent
    ],
    templateUrl: './test.component.html',
})
export class TestComponent {

    private testModel = signal<TestData>({
        demoInput: '',
        testInput: 0
    });

    protected testForm = form(this.testModel, (schemaPath) => {
        required(schemaPath.demoInput);
        CustomValidator.maxLength(schemaPath.demoInput, {max: 2});
    });

    handleFormChanges(event: unknown) {
        console.log("form: ", event);
    }

    onSubmit() {
        this.testForm().markAsTouched();
        console.log("testForm data: ", this.testForm.demoInput());
        console.log("testForm data: ", this.testForm.testInput());
        console.log("testForm data: ", this.testForm.demoInput().errors()[0].message);
    }
}