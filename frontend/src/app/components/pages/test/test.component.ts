import { Component, effect, signal } from "@angular/core";
import { form, max, required } from "@angular/forms/signals";
import { TestInputComponent } from "../../common/form/test-input/test-input.component";

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
        required(schemaPath.demoInput, {message: 'I am required'});
        // maxLength(schemaPath.demoInput, 2, {message: 'I am too long'});
        max(schemaPath.testInput, 3, {message: 'too high number'});
    });

    constructor() {
        effect(() => { this.handleFormChanges(); })
    }

    handleFormChanges() {
        console.log("form: ", this.testForm());
    }

    onSubmit() {
        this.testForm().markAsTouched();
        console.log("testForm data: ", this.testForm.demoInput());
        console.log("testForm data: ", this.testForm.testInput());
        console.log("testForm data: ", this.testForm.demoInput().errors()[0].message);
    }
}