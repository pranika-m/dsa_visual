import json
import subprocess
import sys
import textwrap
import tempfile
import os


def execute_python_code(code: str, input_data=None, timeout: int = 5) -> dict:
    """
    Execute user-submitted Python code in a subprocess with timeout.
    """
    tracer_code = textwrap.dedent(f"""\
        import sys, json, time

        _trace_steps = []
        _input_data = {json.dumps(input_data or [])}

        def _to_jsonable(value, depth=0):
            if depth > 3:
                return repr(value)
            if isinstance(value, (str, int, float, bool)) or value is None:
                return value
            if isinstance(value, (list, tuple)):
                return [_to_jsonable(item, depth + 1) for item in value]
            if isinstance(value, dict):
                return {{
                    str(k): _to_jsonable(v, depth + 1)
                    for k, v in value.items()
                }}
            return repr(value)

        def _tracer(frame, event, arg):
            if event == 'line' and frame.f_code.co_filename == '<user_code>':
                local_vars = {{
                    k: _to_jsonable(v) for k, v in frame.f_locals.items()
                    if not k.startswith('_')
                }}
                _trace_steps.append({{
                    "line": frame.f_lineno,
                    "locals": local_vars,
                }})
            return _tracer

        _start = time.perf_counter_ns()
        try:
            _code = compile(
                {repr(code)},
                '<user_code>',
                'exec'
            )
            sys.settrace(_tracer)
            exec(_code)
            sys.settrace(None)
            _elapsed = (time.perf_counter_ns() - _start) // 1_000_000
            print("__TRACE__" + json.dumps({{
                "success": True,
                "steps": _trace_steps,
                "execution_time_ms": _elapsed,
            }}))
        except Exception as e:
            sys.settrace(None)
            _elapsed = (time.perf_counter_ns() - _start) // 1_000_000
            print("__TRACE__" + json.dumps({{
                "success": False,
                "error": str(e),
                "steps": _trace_steps,
                "execution_time_ms": _elapsed,
            }}))
    """)

    try:
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".py", delete=False
        ) as f:
            f.write(tracer_code)
            tmp_path = f.name

        result = subprocess.run(
            [sys.executable, tmp_path],
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        stdout = result.stdout
        stderr = result.stderr

        trace_data = {"success": False, "steps": [], "execution_time_ms": 0}
        output_lines = []

        for line in stdout.split("\n"):
            if line.startswith("__TRACE__"):
                trace_data = json.loads(line[len("__TRACE__"):])
            else:
                output_lines.append(line)

        user_output = "\n".join(output_lines).strip()

        return {
            "success": trace_data.get("success", False),
            "output": user_output,
            "error": trace_data.get("error", "") or stderr.strip(),
            "steps": trace_data.get("steps", []),
            "execution_time_ms": trace_data.get("execution_time_ms", 0),
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "",
            "error": "Code execution timed out (5 second limit).",
            "steps": [],
            "execution_time_ms": 5000,
        }
    except Exception as e:
        return {
            "success": False,
            "output": "",
            "error": f"Execution error: {str(e)}",
            "steps": [],
            "execution_time_ms": 0,
        }
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass


def execute_c_code(code: str, timeout: int = 5) -> dict:
    """Execute C code using gcc."""
    try:
        # Create temp C file
        with tempfile.NamedTemporaryFile(mode="w", suffix=".c", delete=False) as f:
            f.write(code)
            c_file = f.name

        # Compile
        exe_file = c_file.replace('.c', '')
        compile_result = subprocess.run(
            ['gcc', c_file, '-o', exe_file],
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        if compile_result.returncode != 0:
            return {
                "success": False,
                "output": "",
                "error": f"Compilation error:\n{compile_result.stderr}",
                "steps": [],
                "execution_time_ms": 0,
            }

        # Run
        run_result = subprocess.run(
            [exe_file],
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        return {
            "success": run_result.returncode == 0,
            "output": run_result.stdout.strip(),
            "error": run_result.stderr.strip(),
            "steps": [],
            "execution_time_ms": 0,
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "",
            "error": "Code execution timed out (5 second limit).",
            "steps": [],
            "execution_time_ms": 5000,
        }
    except Exception as e:
        return {
            "success": False,
            "output": "",
            "error": f"Execution error: {str(e)}",
            "steps": [],
            "execution_time_ms": 0,
        }
    finally:
        try:
            os.unlink(c_file)
            if os.path.exists(exe_file):
                os.unlink(exe_file)
        except OSError:
            pass


def execute_cpp_code(code: str, timeout: int = 5) -> dict:
    """Execute C++ code using g++."""
    try:
        # Create temp CPP file
        with tempfile.NamedTemporaryFile(mode="w", suffix=".cpp", delete=False) as f:
            f.write(code)
            cpp_file = f.name

        # Compile
        exe_file = cpp_file.replace('.cpp', '')
        compile_result = subprocess.run(
            ['g++', cpp_file, '-o', exe_file, '-std=c++17'],
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        if compile_result.returncode != 0:
            return {
                "success": False,
                "output": "",
                "error": f"Compilation error:\n{compile_result.stderr}",
                "steps": [],
                "execution_time_ms": 0,
            }

        # Run
        run_result = subprocess.run(
            [exe_file],
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        return {
            "success": run_result.returncode == 0,
            "output": run_result.stdout.strip(),
            "error": run_result.stderr.strip(),
            "steps": [],
            "execution_time_ms": 0,
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "",
            "error": "Code execution timed out (5 second limit).",
            "steps": [],
            "execution_time_ms": 5000,
        }
    except Exception as e:
        return {
            "success": False,
            "output": "",
            "error": f"Execution error: {str(e)}",
            "steps": [],
            "execution_time_ms": 0,
        }
    finally:
        try:
            os.unlink(cpp_file)
            if os.path.exists(exe_file):
                os.unlink(exe_file)
        except OSError:
            pass


def execute_java_code(code: str, timeout: int = 5) -> dict:
    """Execute Java code using javac and java."""
    try:
        # Create temp directory for Java files
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create Main.java file
            java_file = os.path.join(tmpdir, "Main.java")
            with open(java_file, "w") as f:
                f.write(code)

            # Compile
            compile_result = subprocess.run(
                ['javac', java_file],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=tmpdir,
            )

            if compile_result.returncode != 0:
                return {
                    "success": False,
                    "output": "",
                    "error": f"Compilation error:\n{compile_result.stderr}",
                    "steps": [],
                    "execution_time_ms": 0,
                }

            # Run
            run_result = subprocess.run(
                ['java', 'Main'],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=tmpdir,
            )

            return {
                "success": run_result.returncode == 0,
                "output": run_result.stdout.strip(),
                "error": run_result.stderr.strip(),
                "steps": [],
                "execution_time_ms": 0,
            }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "",
            "error": "Code execution timed out (5 second limit).",
            "steps": [],
            "execution_time_ms": 5000,
        }
    except Exception as e:
        return {
            "success": False,
            "output": "",
            "error": f"Execution error: {str(e)}",
            "steps": [],
            "execution_time_ms": 0,
        }


def execute_code(code: str, language: str = 'python', input_data=None, timeout: int = 5) -> dict:
    """
    Execute code in various languages.
    
    Args:
        code: The source code to execute
        language: 'python', 'c', 'cpp', or 'java'
        input_data: Input data for the program
        timeout: Execution timeout in seconds
    """
    language = language.lower()
    
    if language == 'python':
        return execute_python_code(code, input_data, timeout)
    elif language == 'c':
        return execute_c_code(code, timeout)
    elif language == 'cpp':
        return execute_cpp_code(code, timeout)
    elif language == 'java':
        return execute_java_code(code, timeout)
    else:
        return {
            "success": False,
            "output": "",
            "error": f"Unsupported language: {language}",
            "steps": [],
            "execution_time_ms": 0,
        }
