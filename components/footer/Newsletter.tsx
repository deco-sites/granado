import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
import Icon from "$store/components/ui/Icon.tsx";


export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={`flex ${
        tiled
          ? "flex-col gap-4 w-full max-w-[450px] lg:pl-10"
          : "flex-col gap-4"
      }`}
    >
      <div class="flex flex-col gap-4 w-full text-center lg:text-left max-w-[350px]">
        {content?.title && (
          <h3 class={tiled ? "text-2xl lg:text-3xl font-medium" : "text-lg"}>
            {content?.title}
          </h3>
        )}
        {content?.description && <div>{content?.description}</div>}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-row gap-3 relative items-center">
            <input
              name="email"
              class="flex-auto h-[58px] md:flex-none input input-bordered w-full text-base-content join-item"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="disabled:loading join-item absolute right-3"
              disabled={loading}
            >
              <Icon size={20} id="ArrowRight" strokeWidth={3} class="text-[#004030]" />
            </button>
          </div>
        </form>
        {content?.form?.helpText && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;
