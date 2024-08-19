import HydrogenButtonDirective from './hydrogen.directive';
import { HydrogenService } from './hydrogen-service';

describe('HydrogenButtonDirective', () => {
  it('should create an instance', () => {
    const directive = new HydrogenButtonDirective(new HydrogenService());
    expect(directive).toBeTruthy();
  });
});
