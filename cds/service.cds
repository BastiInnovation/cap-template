using { cap.template } from './model';

service SampleService {
    @cds.persistence.skip
    entity Sample @readonly as projection on template.Sample;
}
