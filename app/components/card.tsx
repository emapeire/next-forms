import { FormProps } from "../utils/utils";
import { EditForm } from "../edit-form";
import { DeleteForm } from "../delete-form";

export default function CardComponet({ id, todo }: FormProps) {
  return (
    <>
      <section>
        <EditForm id={id} todo={todo} />
      </section>
      <section>
        <DeleteForm id={id} todo={todo} />
      </section>
    </>
  );
}
